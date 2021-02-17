import React from 'react';
import PropTypes from 'prop-types';
import { CustomPicker } from 'react-color';
import {
    Hue,
    Saturation
} from 'react-color/lib/components/common';

export const MyPicker = (props) => {
    const { onChange, colors , hsl,hsv } = props
    console.log(colors)
    const styles = {
        main: {
            padding: 20
        },
        hue: {
            height: 200,
            position: 'relative',
            marginBottom: 10,
            width: 8
        },
        saturation: {
            width: 250,
            height: 200,
            position: 'relative'
        },
        input: {
            height: 34,
            border: `1px solid ${ colors.hex || '' }`,
            paddingLeft: 10
        },
        swatch: {
            width: 54,
            height: 38,
            background: colors.hex || ''
        }
    };
    return (
        <div className='row' style={ styles.main }>
            <div style={ styles.saturation }>
                <Saturation hsl={ colors.hsl || hsl  } hsv={ colors.hsv || hsv } onChange={ onChange } />
            </div>
            &nbsp;&nbsp;&nbsp;
            <div style={ styles.hue }>
                <Hue direction={ 'vertical' } hsl={ colors.hsl || hsl } onChange={ onChange } />
            </div>
            <div style={ { display: 'flex' } }>
                <div style={ styles.swatch } />
                {colors.hex}

            </div>
        </div>
    );
};
MyPicker.propTypes = {
    onChange: PropTypes.func,
    colors: PropTypes.object
}
export default CustomPicker(MyPicker);
