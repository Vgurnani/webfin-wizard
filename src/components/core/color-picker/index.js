import React from 'react';
import PropTypes from 'prop-types';
import { CustomPicker } from 'react-color';
import {
    Hue,
    Saturation
} from 'react-color/lib/components/common';
import {
    CopyIcon,
} from '../../../utils/svg';
export const MyPicker = (props) => {
    const { onChange, colors, hsl, hsv } = props;
    // const styles = {
    //     main: {
    //         padding: 20
    //     },
    //     hue: {
    //         height: 150,
    //         position: 'relative',
    //         marginBottom: 10,
    //         width: 8
    //     },
    //     saturation: {
    //         width: 194,
    //         height: 150,
    //         position: 'relative'
    //     },
    //     input: {
    //         height: 34,
    //         border: `1px solid ${ colors.hex || '' }`,
    //         paddingLeft: 10
    //     },
    //     swatch: {
    //         width: 30,
    //         height: 30,
    //         borderRadius: 20,
    //         background: colors.hex || ''
    //     }
    // };
    return (
        <div className='webfin-color-selector'>
            <div className="webfin-color-selector-palete">
                <Saturation hsl={ colors.hsl || hsl  } hsv={ colors.hsv || hsv } onChange={ onChange } />
            </div>
            <div className="webfin-color-selector-line">
                <Hue direction={ 'vertical' } hsl={ colors.hsl || hsl } onChange={ onChange } />
            </div>
            <div className="webfin-color-name">
                <label>Hex:</label>
                <span className="color-selector-preview" style={ { background: colors.hex } }></span>
                <span className="select-color-name">{colors.hex}</span>
                <a className="copy-color">
                    <CopyIcon />
                </a>
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
