import Component from '@ember/component';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service'
import moment from 'moment';

export default class SubmissionHeatMapComponent extends Component {
  @service api
  @service store

  heatMap = new CalHeatMap();

  didReceiveAttrs() {
    this.set('submissionsCount', this.fetchSubmissionsCountTask.perform())
  }

  @restartableTask fetchSubmissionsCountTask = function *() {
    const that = this
    const submissionsCount = yield this.api.request(`users/${this.userId}/submissions`)
    this.heatMap.init({
      domain: 'month',
      legend: [0, 10, 15, 20],
      legendVerticalPosition: "top",
      legendHorizontalPosition: "right",
      data: submissionsCount,
      range: 12,
      start: moment().subtract(11, 'months').toDate(),
      tooltip: true,
      cellSize: 12,
      cellPadding: 3,
      colLimit: 4,
      domainGutter: 5,
      onClick: function (date, nb) {
        that.onDateClick(date)
      }
    });
  }
}
