import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class ProblemController extends Controller {
  @action
  onRun(language, code) {
    console.log(language, code)
  }

  @action
  onSubmit(language, code) {
    console.log(language, code)
  }
}
