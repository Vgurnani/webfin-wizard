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
import { hexToHsl, hexToHsv } from 'utils/helpers'
export const MyPicker = (props) => {
    const { onChange,obj,active, hsl, hsv , colors } = props;
    const copyHex = () => {
        const color = document.getElementsByClassName('select-color-name')[ 0 ]
        color.select();
        color.setSelectionRange(0, 99999)
        document.execCommand('copy');
    }
    const hexObj = colors && colors[ active ]
    const hslObj = colors && hexToHsl(colors[ active ])
    const hsvObj = colors && hexToHsv(colors[ active ])

    return (
        <div className='webfin-color-selector'>
            <div className="webfin-color-selector-palete">
                <Saturation hsl={ obj.hsl ||  hslObj || hsl } hsv={ obj.hsv || hsvObj  || hsv   } onChange={ onChange } />
            </div>
            <div className="webfin-color-selector-line">
                <Hue direction={ 'vertical' } hsl={ obj.hsl ||  hsvObj || hsl } onChange={ onChange } />
            </div>
            <div className="webfin-color-name">
                <label>Hex:</label>
                <span className="color-selector-preview" style={ { background: colors[ active ] ||  hexObj } }></span>
                <span><input type='text' className="select-color-name" value={  colors[ active ] || hexObj } /></span>
                <a onClick={ () => copyHex() } className="copy-color">
                    <CopyIcon />
                </a>
            </div>
        </div>
    );
};
MyPicker.propTypes = {
    obj: PropTypes.object,
    active: PropTypes.string,
    data: PropTypes.object,
    onChange: PropTypes.func,
    colors: PropTypes.object,
    hsl: PropTypes.any,
    hsv: PropTypes.any
}
export default CustomPicker(MyPicker);
