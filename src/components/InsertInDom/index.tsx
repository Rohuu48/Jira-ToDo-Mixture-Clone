// @ts-nocheck
import { useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom";

const InsertInDom = ({
  children,
  blockScroll = true,
  domId = null,
  isModal = false,
}) => {
  const [containerElem, updateContainerElem] = useState(null);
  const domContainerRef = useRef(null);

  useEffect(() => {
    if (blockScroll) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      if (domContainerRef.current && !domId) {
        domContainerRef.current.remove();
      }
      if (blockScroll) {
        document.body.style.overflow = "auto";
      }
    };
  }, [domId]);

  const applyAbosluteStyles = (container) => {
    const styles = {
      position: "fixed",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      zIndex: "6000",
    };
    Object.keys(styles).forEach((key) => {
      container.style[key] = styles[key];
    });
  };

  useEffect(() => {
    const domElem = domId ? document.getElementById(domId) : "";
    if (domElem) {
      domContainerRef.current = domElem;
      updateContainerElem(domElem);
      return;
    }

    const cont = document.createElement("div");
    cont.id = "react_portal";
    domContainerRef.current = cont;

    if (isModal) {
      applyAbosluteStyles(cont);
    }
    document.body.appendChild(cont);
    updateContainerElem(cont);
  }, [domId, isModal]);

  return containerElem ? ReactDOM.createPortal(children, containerElem) : null;
};
export default InsertInDom;
