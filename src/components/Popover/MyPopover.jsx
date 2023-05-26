import React, { useState } from 'react';
import { Button, ButtonToolbar, Overlay, Popover } from 'react-bootstrap';

export const MyPopover = () => {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);

  const handleClick = (e) => {
    setTarget(e.target);
    setShow(!show);
  };

  const popoverStyle = {
    height: '400px',
  };

  return (
    <ButtonToolbar>
      <Button onClick={handleClick}>Foto</Button>

      <Overlay
        show={show}
        target={target}
        placement="bottom"
        container={document.body}
        containerPadding={20}
      >
        <div style={{ width: '1200px', ...popoverStyle }}>
          <Popover id="popover-contained" title="Popover bottom" style={popoverStyle}>
            <strong>¡Santo guacamole!</strong> Revisa esta información.
          </Popover>
        </div>
      </Overlay>
    </ButtonToolbar>
  );
};
