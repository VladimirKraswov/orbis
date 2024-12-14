import React from 'react';

import { icons } from '../../../../icons';
import { Box, Button } from '../../../../components';
import { rotateIcon } from '../../../../utils';

import { styles } from './styles';

const buttonGroups = [
  [
    { command: '\x92', label: 'F10%', icon: icons.doubleArrow },
    { command: '\x94', label: 'F1%', icon: icons.arrow },
    { command: '\x90', label: '', icon: icons.loop },
    { command: '\x93', label: 'F1%', icon: icons.arrow, rotate: 180 },
    { command: '\x91', label: 'F10%', icon: icons.doubleArrow, rotate: 180 }
  ],
  [
    { command: '\x92', label: 'S10%', icon: icons.doubleArrow },
    { command: '\x94', label: 'S1%', icon: icons.arrow },
    { command: '\x90', label: '', icon: icons.loop },
    { command: '\x93', label: 'S1%', icon: icons.arrow, rotate: 180 },
    { command: '\x91', label: 'S10%', icon: icons.doubleArrow, rotate: 180 }
  ]
];

const OverrideTab = ({ sendRealtimeCmd }) => (
  <Box id="grblcontroltab" gap="20px" column alignItems="center">
    {buttonGroups.map((group, groupIndex) => (
      <Box key={groupIndex} gap="10px" justifyContent="space-around">
        {group.map(({ command, label, icon, rotate }, buttonIndex) => (
          <Button
            key={buttonIndex}
            variant="outline"
            onClick={() => sendRealtimeCmd(command)}
            style={styles.button}
          >
            <svg width="1.3em" height="1.4em" viewBox="0 0 1300 1200">
              <g transform="translate(50,1200) scale(1, -1)">
                {rotate ? rotateIcon(icon, rotate) : <path fill="black" d={icon}></path>}
              </g>
            </svg>
            <span>{label}</span>
          </Button>
        ))}
      </Box>
    ))}
  </Box>
);

export default OverrideTab;
