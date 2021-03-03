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
