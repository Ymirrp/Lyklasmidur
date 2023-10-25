import React, { useEffect, useState } from 'react';

const Home = () => {

    const [ password, setPassword ] = useState("");
    const [ isLoading, setIsLoading ] = useState(false);
    const [ valLength, setValLength ] = useState(false);
    const [ valNumber, setValNumber ] = useState(false);
    const [ valSpecial, setValSpecial ] = useState(false);
    const [ isCopied, setIsCopied ] = useState(false);

    const getPassword = async () => {
        setIsLoading(true);
        setIsCopied(false);

        const res = await fetch('api/password');
        const data = await res.text();

        setPassword(data);
        validate(data);
        setIsLoading(false);
    };

    const copy = async () => {
        if (password.length > 0) {
            await navigator.clipboard.writeText(password).then(() => {
                setIsCopied(true);
            });
        }
    };

    const validate = pw => {
        setValLength(pw.length >= 12);
        setValNumber(/\d/.test(pw));
        setValSpecial(/[!@#\$%\^\&*\)\(+=._-]+/g.test(pw));
    }

    const handleInputChange = e => {
        validate(e.target.value);
        setPassword(e.target.value);
    }

    return (
        <div className="d-flex flex-column align-items-center">
            <div id="logo"></div>
            <div>
                <p class="lead">Það er nauðsynlegt að vera með öruggt lykilorð. Með þessu tóli getur þú fengið framkallað lykilorð sem er öruggt og einnig skemmtileg. Það eykur líkurnar á að þú munir þau!</p>
                <p>Lyklasmiðurinn byrjar á að sækja nafnorð í gagnagrunninn sinn, bætir við sértákni og svo nokkrum tölum. En oft er það ekki nógu langt, því næst sækir Lyklasmiðurinn lýsingarorð og smellir því fyrir framan. Lyklasmiðurinn er þó ekki sérstaklega góður í íslenskunni þó hann reynir það. Þér er því velkomið að breyta lykilorðinu, ef þú vilt.</p>
                <p>Öruggt lykilorð ætti helst að vera minnst 12 stafir, en betra ef það væri lengra. Einnig er gott að hafa eitthvað sértákn, eins og til dæmis punktinn, og einhverjar tölustafir. Allt þetta lengir fyrir óprúttna aðila að giska á lykilorðið!</p>
            </div>
            <div className="input-group">
                <input type="text" className="form-control form-control-lg inp-custom" id="inp-pw" value={password} onChange={handleInputChange} />
                { isCopied ? (<span className="fa-solid fa-check text-success" id="copied-mark"></span>) : <></> }
                <button className="btn btn-outline-secondary btn-copy py-md-4 px-md-5" type="button" title="Afrita" aria-label="Afrita" onClick={ () => copy() }> </button>
            </div>
            {
                isLoading ?
                    (<button type="button" className="btn btn-custom disabled">Sækir...</button>) :
                    (<button type="button" className="btn btn-custom" onClick={async () => await getPassword()}>Sækja</button>)
            }
            <div className="container mt-4">
                <div className="row">
                    <div className="col-1 text-right">
                        {
                            valLength ?
                                (<span className="fa-solid fa-check text-success" aria-label="Rétt"></span>) :
                                (<span className="fa-solid fa-x text-danger" aria-label="Rangt"></span>)
                        }
                    </div>
                    <div className="col-10">Lykilorð er að minnsta kosti 12 stafir</div>
                </div>
                <div className="row">
                    <div className="col-1 text-right">
                        {
                            valNumber ?
                                (<span className="fa-solid fa-check text-success" aria-label="Rétt"></span>) :
                                (<span className="fa-solid fa-x text-danger" aria-label="Rangt"></span>)
                        }
                    </div>
                    <div className="col-10">Lykilorð inniheldur að minnsta kosti einn tölustaf</div>
                </div>
                <div className="row">
                    <div className="col-1 text-right">
                        {
                            valSpecial ?
                                (<span className="fa-solid fa-check text-success" aria-label="Rétt"></span>) :
                                (<span className="fa-solid fa-x text-danger" aria-label="Rangt"></span>)
                        }
                    </div>
                    <div className="col-10">Lykilorð er með að minnsta kosti eitt sértákn</div>
                </div>
            </div>
        </div>
    );
};

export { Home };
