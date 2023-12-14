import React from 'react';
import './Footer.scss';

export const Footer = () => {
  return (
    <div className="footer">
      <p className="footer__text">© 2023 <a href="https://github.com/wendykr/" className="footer__text--link">Vendula Krajíčková</a></p>
      <p className="footer__text">Adventní kódovací soutěž s <a href="https://reactgirlsprague.notion.site/reactgirlsprague/Sout-ReactGirls-ve-spolupr-ci-s-Lenovo-ThinkPad-80e4a0778018490bb499224db87e86e6" className="footer__text--link">ReactGirls</a> a Lenovo</p>
    </div>
  );
};