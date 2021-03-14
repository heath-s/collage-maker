import React, { forwardRef, ReactNode, useEffect } from 'react';
import { render } from 'react-dom';

interface Props {
  children: ReactNode;
  height?: number;
  left?: number;
  offsetLeft?: number;
  offsetTop?: number;
  rotate?: number;
  top?: number;
  width?: number;
}

// eslint-disable-next-line react/display-name
const CanvasPortal = forwardRef<HTMLDivElement, Props>(({
  children,
  height = 0,
  left = 0,
  offsetLeft = 0,
  offsetTop = 0,
  rotate = 0,
  top = 0,
  width = 0,
}, ref) => {
  useEffect(() => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    render(
      (
        <div
          ref={ref}
          style={{
            display: 'inline-block',
            left: offsetLeft + left,
            height,
            pointerEvents: 'none',
            position: 'absolute',
            transform: `rotate(${rotate}deg)`,
            transformOrigin: 'left top',
            top: offsetTop + top,
            width,
          }}
        >
          {children}
        </div>
      ),
      div
    );

    return () => {
      document.body.removeChild(div);
    };
  });

  return null;
});

export default CanvasPortal;
