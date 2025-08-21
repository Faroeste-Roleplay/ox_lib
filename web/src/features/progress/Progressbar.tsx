import React from 'react';
import { Box, createStyles, Text } from '@mantine/core';
import { useNuiEvent } from '../../hooks/useNuiEvent';
import { fetchNui } from '../../utils/fetchNui';
import ScaleFade from '../../transitions/ScaleFade';
import type { ProgressbarProps } from '../../typings';

const useStyles = createStyles((theme) => ({
  container: {
    width: 300,
    height: 20,
    paddingInline: "10px",
    borderRadius: theme.radius.sm,
    // backgroundColor: theme.colors.dark[5],
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    position:"relative",
  },
  wrapper: {
    width: '100%',
    height: '20%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
    position: 'absolute',
  },
  bar: {
    height: '4px',
    backgroundColor: '#f2f2f2',
  },
  barBg: {
    position:"absolute",
    height: '4px',
    width: "94%",
    backgroundColor: '#f2f2f270',
  },
  labelWrapper: {
    position: 'absolute',
    display: 'flex',
    width: 300,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    maxWidth: 300,
    padding: 8,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    fontSize: 16,
    color: theme.colors.gray[3],
    textShadow: theme.shadows.sm,
  },
}));

const Progressbar: React.FC = () => {
  const { classes } = useStyles();
  const [visible, setVisible] = React.useState(false);
  const [label, setLabel] = React.useState('');
  const [duration, setDuration] = React.useState(0);

  useNuiEvent('progressCancel', () => setVisible(false));

  useNuiEvent<ProgressbarProps>('progress', (data) => {
    setVisible(true);
    setLabel(data.label);
    setDuration(data.duration);
  });

  return (
    <>
      <Box className={classes.wrapper}>
        <ScaleFade visible={visible} onExitComplete={() => fetchNui('progressComplete')}>
          <Box className={`classes.container progressbar-bg ${classes.container}`}>
            <Box
              className={classes.bar}
              onAnimationEnd={() => setVisible(false)}
              sx={{
                animation: 'progress-bar linear',
                animationDuration: `${duration}ms`,
              }}
            />
            <Box
              className={classes.barBg}
            />
          </Box>
          
          <Box className={classes.labelWrapper}>
                <Text className={classes.label}>{label}</Text>
              </Box>
        </ScaleFade>
      </Box>
    </>
  );
};

export default Progressbar;
