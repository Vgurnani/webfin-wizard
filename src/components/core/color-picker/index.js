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
import { hexToHsl } from 'utils/helpers'
export const MyPicker = (props) => {
    const { onChange,data,active, colors, hsl, hsv } = props;
    const colorObj = data && data.colors && JSON.parse(data.colors)
    const copyHex = () => {
        const color = document.getElementsByClassName('select-color-name')[ 0 ]
        color.select();
        color.setSelectionRange(0, 99999)
        document.execCommand('copy');
    }
    return (
        <div className='webfin-color-selector'>
            <div className="webfin-color-selector-palete">
                <Saturation hsl={ colorObj && hexToHsl(colorObj[ active ]) ||  hsl  } hsv={ colors.hsv || hsv } onChange={ onChange } />
            </div>
            <div className="webfin-color-selector-line">
                <Hue direction={ 'vertical' } hsl={ colorObj && hexToHsl(colorObj[ active ]) || hsl } onChange={ onChange } />
            </div>
            <div className="webfin-color-name">
                <label>Hex:</label>
                <span className="color-selector-preview" style={ { background: colors.hex || colorObj&& colorObj[ active ] } }></span>
                <span><input type='text' className="select-color-name" value={ colors.hex || colorObj && colorObj[ active ] } /></span>
                <a onClick={ () => copyHex() } className="copy-color">
                    <CopyIcon />
                </a>
            </div>
        </div>
    );
};
MyPicker.propTypes = {
    active: PropTypes.string,
    data: PropTypes.object,
    onChange: PropTypes.func,
    colors: PropTypes.object,
    hsl: PropTypes.any,
    hsv: PropTypes.any
}
export default CustomPicker(MyPicker);
