import Select from 'react-select';
import { css } from '@emotion/react';
import { useState, FC, useEffect, ChangeEvent, useRef } from 'react';
import './App.css';
import AsuraSpring from './components/AsuraSpring';
import Header from './components/Header';
import { useReactToPrint } from 'react-to-print';

interface Options {
  value: string;
  label: string;
}

const App: FC = () => {
  const options: Options[] = [
    {
      value: 'Klee One',
      label: '手書き',
    },
    {
      value: 'sans-selif',
      label: 'ゴシック体',
    },
    {
      value: 'serif',
      label: '明朝体',
    },
  ];
  const maxTextLength = 150;
  const navigateMessage = '印刷したい文字を入力...';

  const [font, setFont] = useState<string>('Klee One');
  const [oldText, setOldText] = useState<string>('');
  const [text, setText] = useState<string>('');
  const printableRef = useRef<HTMLDivElement>(null);
  const printComponentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setText(AsuraSpring);
  }, []);

  useEffect(() => {
    const textareaEl = document.querySelector(
      '.inputText'
    ) as HTMLTextAreaElement;
    if (textareaEl) {
      textareaEl.style.height = 'auto';
      textareaEl.style.height = `${textareaEl.scrollHeight}px`;
    }
  }, [text]);

  const container = css`
    max-width: 297mm;
    margin: 10px 10px;

    @media (max-width: 480px) {
      box-sizing: border-box;
      padding-left: 0;
      padding-right: 0;
      /* width: 297mm; */
      /* height: 210mm; */
    }
  `;

  const cssWrapper = (font: string) => {
    return css`
      color: gray;
      flex-direction: column;
      flex-wrap: wrap;
      font-family: ${font}, cursive;
      width: 100%;
      height: 210mm;
      margin-left: 0px;
      margin-top: 0px;
      margin-right: 0px;
      margin-bottom: 0px;
      padding: 10px 10px;
      border: solid 10px #165b8f;
      box-sizing: border-box;
      writing-mode: vertical-rl;
      text-orientation: upright;
      white-space: pre-line;
      word-break: break-word;
      overflow: scroll;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      font-size: 5vw;
      letter-spacing: 10px;
      @media (max-width: 480px) {
        width: 95%;
        max-width: 95%;
        height: 60%;
        font-size: 8vw;
        max-height: calc(8vw * 8 + 24px);
      }
    `;
  };

  const characterWrapper = css`
    border: 1px solid #000;
    margin: 1mm 2.5mm;
    position: relative;

    &&::before,
    &&::after {
      content: '';
      position: absolute;
      border: 1px dashed rgba(0, 255, 255, 0.5);
      z-index: 1;
    }

    &&::before {
      width: 0;
      height: 100%;
      left: 50%;
    }

    &&::after {
      width: 100%;
      height: 0;
      top: 50%;
    }
  `;

  const cssWrapperPreview = (font: string) => {
    return css`
      ${cssWrapper(font)}
      color: rgba(238, 238, 238, 0.496);
      border: none;
      height: auto;
      margin-top: 30px;
      overflow: hidden;
    `;
  };

  const fontSelect = css`
    color: black;
    font-family: font;
    width: 100%;
    @media (max-width: 480px) {
      width: calc(100% - 12px);
    }
  `;

  const navigator = css`
    display: flex;
    justify-content: space-between;
  `;

  const buttonStyles = (
    backgroundColor: string,
    hoverColor: string,
    activeColor: string
  ) => css`
    padding: 10px;
    font-weight: bold;
    color: #fff;
    background-color: ${backgroundColor};
    border: none;
    border-radius: 5px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
    transition: background-color 0.3s ease;
    cursor: pointer;

    &:hover {
      background-color: ${hoverColor};
    }

    &:active {
      background-color: ${activeColor};
      box-shadow: none;
      transform: translateY(2px);
    }
  `;

  const printer = css`
    display: flex;
    justify-content: space-between;
  `;

  const inputText = css`
    font-family: ${font}, cursive;
    display: flex;
    flex-direction: column;
    resize: none;
    width: 100%;
    padding: 6px;
    font-size: 16px;
    box-sizing: border-box;
    @media (max-width: 480px) {
      font-size: 6vw;
      width: calc(100% - 12px);
    }
  `;

  const countLengths = css`
    color: ${text.length >= maxTextLength ? '#ff0000' : 'auto'};
  `;

  const changeTextFonts = (newValue: Options | null) => {
    setFont(newValue?.value ?? '');
  };

  const textReset = (): void => {
    setText('');
  };

  const changeHandleText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value.length <= maxTextLength ? e.target.value : oldText);
    setOldText(text);
  };

  const handlePrint = useReactToPrint({
    content: () => printComponentRef.current,
    documentTitle: 'BallPointLesson',
    pageStyle: `
      @page {
        size: A4 landscape;
        margin: 0;
      }
      @media print {
        body {
          margin: 0;
        }

      }
    `,
  });

  return (
    <>
      <Header font={font} />
      <div css={container}>
        <div css={cssWrapper(font)} ref={printableRef}>
          <p>{text}</p>
        </div>

        <Select
          css={fontSelect}
          placeholder='フォントを選択...'
          options={options}
          onChange={changeTextFonts}
        />
        <div css={navigator} className='navigator'>
          <p>↓↓↓印刷したい文字を入力してね↓↓↓</p>
          <button
            css={buttonStyles('#8a4540', '#d32f2f', '#b71c1c')}
            onClick={textReset}
          >
            入力内容のリセット
          </button>
        </div>
        <textarea
          css={inputText}
          value={text}
          placeholder={navigateMessage}
          className='inputText'
          onChange={changeHandleText}
          maxLength={maxTextLength}
        />
        <div css={printer} className='navigator'>
          <p css={countLengths}>{`入力文字数：${text.length}文字`}</p>
          <button
            css={buttonStyles('#1b548d', '#246bbd', '#0d47a1')}
            onClick={handlePrint}
          >
            印刷プレビュー
          </button>
        </div>
      </div>
      <div style={{ display: 'none' }}>
        <div ref={printComponentRef}>
          <div css={cssWrapperPreview(font)}>
            <>
              <p>
                {text.split('').map((char, index) => (
                  <span
                    key={index}
                    css={char === '\n' ? null : characterWrapper}
                  >
                    {char}
                  </span>
                ))}
              </p>
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
