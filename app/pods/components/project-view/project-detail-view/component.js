import Component from '@ember/component';
import { computed } from '@ember/object';
import YAML from 'js-yaml';

export default class ProjectDetailView extends Component {
  @computed('project.config_yml')
  get allowedDirectories() {
    const config = YAML.load(this.project.config_yml)
    return config.project && config.project['allowed-folders']
  }
}