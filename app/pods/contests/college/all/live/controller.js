import Controller from '@ember/controller';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { restartableTask } from 'ember-concurrency-decorators';

export default class LiveController extends Controller {
	@service store

	queryParams = ['offset', 'limit']
	offset = 0
	limit = 6

	@computed('offset', 'limit')
	get page() {
		return {
			offset: this.offset,
			limit: this.limit
		}
	}

	@restartableTask fetchContestsTask = function* () {
		try {
			return yield this.store.query('college_contest', {
				page: this.page,
				custom: {
					ext: 'url',
					url: 'live',
				}
			})
		} catch (err) {
			this.set('showError', true)
		}
	}

	@action
	setOffset(offset) {
		this.set('page.offset', offset)
		this.fetchContestsTask.perform()
	}

}
