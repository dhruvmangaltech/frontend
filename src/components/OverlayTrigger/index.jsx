import React from 'react';
import { OverlayTrigger, Tooltip } from '@themesberg/react-bootstrap';
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip as ReactTooltip } from 'react-tooltip';

const Trigger = ({ message, id }) => {
  return (
    // <OverlayTrigger
    //   placement='bottom'
    //   delay={{ show: 100, hide: 200 }}
    //   overlay={<Tooltip style={{ margin: 0 }}>{message}</Tooltip>}
    // >
    //   {children}
    // </OverlayTrigger>
    <ReactTooltip className='z-3' anchorId={id} place='bottom' content={message} />
  );
};

export default Trigger;
