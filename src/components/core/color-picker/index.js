import React from 'react';
import PropTypes from 'prop-types';
import { CustomPicker } from 'react-color';
import {
    Hue,
    Saturation
} from 'react-color/lib/components/common';

export const MyPicker = (props) => {
    const { onChange, colors, hsl, hsv } = props;
    const styles = {
        main: {
            padding: 20
        },
        hue: {
            height: 150,
            position: 'relative',
            marginBottom: 10,
            width: 8
        },
        saturation: {
            width: 194,
            height: 150,
            position: 'relative'
        },
        input: {
            height: 34,
            border: `1px solid ${ colors.hex || '' }`,
            paddingLeft: 10
        },
        swatch: {
            width: 30,
            height: 30,
            borderRadius: 20,
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
                <span>Hex:</span>
                <div style={ styles.swatch } />
                {colors.hex}

            </div>
        </div>
    );
};
MyPicker.propTypes = {
    onChange: PropTypes.func,
    colors: PropTypes.object,
    hsl: PropTypes.any,
    hsv: PropTypes.any
}
export default CustomPicker(MyPicker);
