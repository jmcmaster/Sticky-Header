import { throttle } from "lodash";

const states = {
  HIDDEN: "HIDDEN",
  VISIBLE: "VISIBLE"
};

export default class StickyHeader {
  handleScroll = () => {
    if (this.state === states.HIDDEN && !this.isScrollNearPageTop()) {
      this.showStickyHeader();
    } else if (this.state === states.VISIBLE && this.isScrollNearPageTop()) {
      this.hideStickyHeader();
    }
  };

  constructor(params) {
    this.state = states.HIDDEN;
    this.container = document.querySelector(params.container);
    this.stickyElement = document.querySelector(params.stickyElement);
    this.listeningElements = document.querySelectorAll(
      params.listeningElements
    );
    this.stickyClass = params.stickyClass;
    this.threshold = this.container.offsetHeight;
  }

  init() {
    document.addEventListener("scroll", throttle(this.handleScroll, 100));
  }

  showStickyHeader() {
    this.state = states.VISIBLE;
    this.stickyElement.classList.add(this.stickyClass);

    [...this.listeningElements].forEach(node => {
      node.classList.add(this.stickyClass);
    });
  }

  hideStickyHeader() {
    this.state = states.HIDDEN;
    this.stickyElement.classList.remove(this.stickyClass);

    [...this.listeningElements].forEach(node => {
      node.classList.remove(this.stickyClass);
    });
  }

  isScrollNearPageTop() {
    const scrollTop =
      window.pageYOffset ||
      (document.documentElement || document.body.parentNode || document.body)
        .scrollTop;

    if (scrollTop < this.threshold) {
      return true;
    }
    return false;
  }
}
