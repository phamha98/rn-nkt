export default class ProgressHolder {
  static progress;

  static setProgress(progress) {
    this.progress = progress;
  }
  static visible(msg?: string) {
    this.progress?.toggle(true, msg);
  }
  static hidden() {
    this.progress?.toggle(false);
  }
}
