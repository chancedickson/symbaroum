import Preact, {Component} from "preact";
import {withRouter} from "react-router-dom";

class ScrollToTopComponent extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

export const ScrollToTop = withRouter(ScrollToTopComponent);
