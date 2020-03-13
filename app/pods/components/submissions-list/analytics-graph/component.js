import Component from '@ember/component';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';
import { computed } from '@ember/object';

export default class AnalyticsGraph extends Component {
  @service api

  @alias('fetchAnalyticsTask.lastSuccessful.value') analytics
  @alias('fetchSubmissionSummaryTask.lastSuccessful.value') summary
  options = {
    legend: {
      display: false
    }, 
    scales: {
      xAxes: [{
          barThickness: 30,
          gridLines: {
              offsetGridLines: true
          }
      }]
    } 
  }

  @computed('analytics')
  get languageData() {
    if (this.analytics) {
      return {
        labels: this.analytics.map(_ => _.language),
        datasets: [
          {
            data: this.analytics.map(_ => +_.submissionCount),
            fill:false,
            backgroundColor: this.gradient
          }
        ]
      }
    }
  }
  @computed('summary')
  get summaryData() {
    if (this.summary) {
      return {
        labels: this.summary.map(_ => _.explanation),
        datasets: [
          {
            data: this.summary.map(_ => +_.submissionCount),
            fill:false,
            backgroundColor: this.gradient
          }
        ]
      }
    }
  }

  didReceiveAttrs() {
    this.fetchAnalyticsTask.perform()
    this.fetchSubmissionSummaryTask.perform()
  }

  didInsertElement() {
    const ctx = document.getElementsByTagName('canvas')[0].getContext("2d")
    const gradient = ctx.createLinearGradient(0, 0, 0, 200)
    gradient.addColorStop(0, '#ec6333')
    gradient.addColorStop(1, '#f19633')
    this.set('gradient', gradient)
  }

  @restartableTask fetchAnalyticsTask = function *() {
    return yield this.api.request(`problems/${this.problem.get('id')}/language-analytics`, {
      type: 'GET',
      data: {
        contest_id: this.contest.id
      }
    })
  }
  @restartableTask fetchSubmissionSummaryTask = function *() {
    return yield this.api.request(`problems/${this.problem.get('id')}/submissions-summary`, {
      type: 'GET',
      data: {
        contest_id: this.contest.id
      }
    })
  }
}
