import Controller from '@ember/controller';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { restartableTask } from 'ember-concurrency-decorators';

export default class ArchivedController extends Controller {
	@service store

	queryParams = ['offset', 'limit', 'q']
	offset = 0
	limit = 6
	q = ''

	@computed('offset', 'limit')
	get page() {
		return {
			offset: this.offset,
			limit: this.limit
		}
	}

	@computed('q')
	get filter() {
		this.set('offset', 0)
		if (this.q !== '')
			return {
				name: {
					$iLike: `%${this.q}%`
				}
			}
	}

	@restartableTask fetchContestsTask = function* () {
		try {
			return yield this.store.query('admission-contest', {
				page: this.page,
				custom: {
					ext: 'url',
					url: 'archived',
				},
				filter: {
					...this.filter,
					type: 'apat'
				}
			})
		} catch (err) {
			this.set('showError', true)
		}
	}

	@action
	setOffset(offset) {
		this.set('offset', offset)
	}
}
