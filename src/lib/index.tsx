import type { LinearGradientProps } from 'react-native-linear-gradient'
import React, { PureComponent, ReactNode } from 'react';
import { View } from '@tarojs/components';

interface LinearGradientState {

}

const directionMap = [
  ['top left', 'top', 'top right'],
  ['left', null, 'right'],
  ['bottom left', 'bottom', 'bottom right'],
]

function getDirction(start: LinearGradientProps['start'], end: LinearGradientProps['end']): string | null {
  const d = directionMap[end.y - start.y + 1]?.[end.x - start.x + 1]
  if(!d) return null
  return `to ${d}`
}

interface extendLinearGradientProps extends LinearGradientProps {
  children?: ReactNode
  style?: any
}

export default class LinearGradient extends PureComponent<extendLinearGradientProps, LinearGradientState> {
  static defaultProps = {
    start: {
      x: 0.5,
      y: 0,
    },
    end: {
      x: 0.5,
      y: 1,
    },
    locations: [],
    colors: [],
    useAngle: false,
    angle: 0,
  };

  state = {
    width: 1,
    height: 1,
  };

  getAngle = () => {
    const { start, end } = this.props

    const direction = getDirction(start, end)
    if(direction) return direction

    if (this.props.useAngle) {
      return this.props.angle + 'deg';
    }

    // Math.atan2 handles Infinity
    const angle =
      Math.atan2(
        this.state.width * (this.props.end.y - this.props.start.y),
        this.state.height * (this.props.end.x - this.props.start.x)
      ) +
      Math.PI / 2;
    return angle + 'rad';
  };

  getColors = () =>
    this.props.colors
      .map((color, index) => {
        const location = this.props.locations[index];
        let locationStyle = '';
        if (location) {
          locationStyle = ' ' + location * 100 + '%';
        }
        return color + locationStyle;
      })
      .join(',');

  render() {
    const {
      start,
      end,
      colors,
      locations,
      useAngle,
      angleCenter,
      angle,
      style,
      children,
      ...otherProps
    } = this.props;
    return (
      <View
        {...otherProps}
        // @ts-ignore
        style={[
          style,
          { backgroundImage: `linear-gradient(${this.getAngle()},${this.getColors()})` },
        ]}
      >
        {children}
      </View>
    );
  }
}