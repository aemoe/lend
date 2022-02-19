import React from 'react';
import './starBpro.module.scss';
import star from "../../public/icons/rating-star.svg";
import bpro from '../../public/images/BPRO-logo.svg';
import ReactTooltip from 'react-tooltip';
import { useEffect } from 'react';

interface Props {
    active: boolean;
    backstop: boolean;
}

const StarBpro: React.FC<Props> = (props: Props) => {
    useEffect(() => {
        ReactTooltip.rebuild();
    });

    return props.active && props.backstop ? (
        <div className="star-bpro star-bpro-icons">
            <img src={bpro} data-tip data-for="BPRO" />
            <img src={star} />
            <ReactTooltip id="BPRO" place="top" effect="solid" delayHide={100} delayShow={100} delayUpdate={100}>
                <p style={{ textAlign: 'center' }}>This market includes a B.Protocol backstop pool.</p>
                <p>
                    Learn more about backstop pools{' '}
                    <a
                        className="a"
                        target="_blank"
                        rel="noreferrer"
                        href="https://docs.hundred.finance/core-protocol/backstop-provision"
                    >
                        here
                    </a>{' '}
                </p>
            </ReactTooltip>
        </div>
    ) : props.active ? (
        <div className="star star-bpro-icons">
            <img src={star} />
        </div>
    ) : props.backstop ? (
        <div className="bpro star-bpro-icons">
            <img src={bpro} data-tip data-for="BPRO" />
            <ReactTooltip id="BPRO" place="top" effect="solid" delayHide={100} delayShow={100} delayUpdate={100}>
                <p style={{ textAlign: 'center' }}>This market includes a B.Protocol backstop pool.</p>
                <p>
                    Learn more about backstop pools{' '}
                    <a
                        className="a"
                        target="_blank"
                        rel="noreferrer"
                        href="https://docs.hundred.finance/core-protocol/backstop-provision"
                    >
                        here
                    </a>{' '}
                </p>
            </ReactTooltip>
        </div>
    ) : (
        <></>
    );
};

export default StarBpro;
