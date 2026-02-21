import React from 'react';

type AnyProps = React.HTMLAttributes<HTMLElement> & {
  initial?: Record<string, unknown>;
  animate?: Record<string, unknown>;
  whileHover?: Record<string, unknown>;
  transition?: Record<string, unknown>;
  layout?: boolean;
};

function passthrough(tag: keyof JSX.IntrinsicElements) {
  return React.forwardRef<HTMLElement, AnyProps>(function MotionLike(props, ref) {
    const { initial: _initial, animate: _animate, whileHover: _whileHover, transition: _transition, layout: _layout, ...rest } = props;
    return React.createElement(tag, { ...rest, ref });
  });
}

export const motion = {
  div: passthrough('div'),
  section: passthrough('section'),
  article: passthrough('article'),
  p: passthrough('p')
};
