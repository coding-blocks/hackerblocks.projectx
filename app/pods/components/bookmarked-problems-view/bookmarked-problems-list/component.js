import Component from "@ember/component";
import { alias } from "@ember/object/computed";
import { action, computed } from "@ember/object";
import { restartableTask } from "ember-concurrency-decorators";
import { inject as service } from "@ember/service";

export default class BookmarkedProblemsListComponent extends Component {
  @service store;

  offset = 0;
  limit = 5;

  @computed("offset", "limit")
  get page() {
    return {
      offset: this.offset,
      limit: this.limit,
    };
  }

  @computed("q")
  get relationshipFilter() {
    this.set("offset", 0);
    if (this.q !== "") {
      return {
        content: {
          name: {
            $ilike: `%${this.q}%`,
          },
        },
      };
    }
  }

  @alias("fetchBookmarkedContentsTask.lastSuccessful.value") bookmarkedContents;

  didReceiveAttrs() {
    this.fetchBookmarkedContentsTask.perform();
  }

  @restartableTask fetchBookmarkedContentsTask = function* () {
    return yield this.store.query("bookmarked-content", {
      include: "contest,content",
      exclude: "user.*,contest.*,content.*",
      filterRelationships: this.relationshipFilter,
      page: this.page,
    });
  };

  @action
  setOffset(offset) {
    this.set("offset", offset);
    this.fetchBookmarkedContentsTask.perform();
  }
}
