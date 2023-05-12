type PageDecorProps = {
  size: keyof typeof PageDecorTypes;
};

const PageDecorTypes = {
  small: {
    img: 'img/content/maniac/maniac-size-m',
    height: '768'
  },
  big: {
    img: 'img/content/maniac/maniac-bg-size-m',
    height: '1959'
  },
};

export default function PageDecor ({size}: PageDecorProps): JSX.Element {
  return (
    <div className="decorated-page__decor" aria-hidden="true">
          <picture>
            <source
              type="image/webp"
              srcSet={`${PageDecorTypes[size].img}.webp, ${PageDecorTypes[size].img}@2x.webp 2x`}
            />
            <img
              src={`${PageDecorTypes[size].img}.jpg`}
              srcSet={`${PageDecorTypes[size].img}@2x.jpg 2x`}
              width="1366"
              height={PageDecorTypes[size].height}
              alt=""
            />
          </picture>
        </div>
  );
}
