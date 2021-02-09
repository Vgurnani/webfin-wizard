import React from 'react'
import PropTypes from 'prop-types';

const CustomTable = (props) => {
    const { headings } = props
    return(
        <div className="table-responsive">
            <table>
                <thead>

                    <tr>
                        {headings.map((item, key) =>
                            <th key={ key }>{ item }</th>)
                        }
                    </tr>
                </thead>
                <tbody>
                    {props.children}
                </tbody>
            </table>
        </div>)
}

CustomTable.propTypes = {
    headings: PropTypes.array,
    children: PropTypes.children
}

export default CustomTable