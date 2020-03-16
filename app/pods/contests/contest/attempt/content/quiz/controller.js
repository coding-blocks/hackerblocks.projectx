import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class QuizController extends Controller {
  @service api

  queryParams = ['q']

  q = 1

  @action
  changeQuestion(question_id) {
    this.set('q', question_id)
  }
}
