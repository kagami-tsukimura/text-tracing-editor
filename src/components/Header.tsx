/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const headerStyle = (font: string) =>
  css`
    padding: 12px;
    font-size: 36px;
    font-family: ${font}, cursive;
    text-align: center;
    font-weight: bold;
    margin: 0 auto;
    width: fit-content;
  `;

const Header = ({ font }: { font: string }) => {
  return <div css={headerStyle(font)}>文字なぞりエディタ</div>;
};

export default Header;
