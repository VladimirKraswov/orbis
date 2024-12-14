import React from 'react';
import { icons } from '../../../../icons';
import { Box, Button, SvgIcon } from '../../../../components';
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

const SpindleTab = ({ sendRealtimeCmd }) => (
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
            <SvgIcon icon={icon} width="1.3em" height="1.4em" viewBox="0 0 1300 1200" />
            <span>{label}</span>
          </Button>
        ))}
      </Box>
    ))}
  </Box>
);

export default SpindleTab;
