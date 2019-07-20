import Service from '@ember/service';

export default class NavigationService extends Service {
  visible = true

  setVisibility(visible) {
    this.set('visible', visible)
  }
}
