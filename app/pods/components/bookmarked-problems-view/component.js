import Component from "@ember/component";
import { inject as service } from "@ember/service";

export default class BookmarkedProblemsView extends Component {
  @service store;

  q = "";
}
