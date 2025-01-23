import React, { ReactNode } from 'react';
import { AnimatePresence as FramerAnimatePresence } from 'framer-motion';

const AnimatePresence = (
  props: {
    children: ReactNode;
    mode?: 'wait' | 'sync';
    initial?: boolean;
    onExitComplete?: () => void;
    exitBeforeEnter?: boolean;
    presenceAffectsLayout?: boolean;
  }
) => {
  return React.createElement(
    FramerAnimatePresence, 
    {
      ...props as React.Attributes & typeof props
    },
    props.children
  );
};

export default AnimatePresence;
