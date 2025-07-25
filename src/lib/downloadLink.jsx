﻿import React, { Component } from "react";
import PropTypes from "prop-types";

class DownloadLink extends Component {
  handleDownloadClick(event) {
    function magicDownload(text, fileName, className) {
      const blob = new Blob([text], {
        type: "text/csv;charset=utf8;",
      });

      // create hidden link
      const element = document.createElement("a");
      document.body.appendChild(element);
      element.setAttribute("href", window.URL.createObjectURL(blob));
      element.setAttribute("download", fileName);
      element.setAttribute("class", className);

      element.style.display = "";

      element.click();

      document.body.removeChild(element);
      event.stopPropagation();
    }

    const fileType = event.target.innerText;
    const text = this.props.exportFile(fileType);

    if (text instanceof Promise) {
      text.then((result) =>
        magicDownload(result, this.props.filename, this.props.className)
      );
    } else {
      magicDownload(text, this.props.filename, this.props.className);
    }
  }

  render() {
    return React.createElement(
      this.props.tagName || "a",
      {
        style: this.props.style,
        className: this.props.className,
        // href: "javascript:void(0)",
        onClick: this.handleDownloadClick.bind(this),
      },
      this.props.label
    );
  }
}

DownloadLink.defaultProps = {
  filename: "code.txt",
  label: "Download",
  exportFile: () => {},
};

DownloadLink.propTypes = {
  filename: PropTypes.string,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]),
  className: PropTypes.string,
  style: PropTypes.object,
  exportFile: PropTypes.func,
};

export default DownloadLink;
