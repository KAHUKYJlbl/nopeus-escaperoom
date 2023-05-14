type PageDecorProps = {
  size: keyof typeof PageDecorTypes;
  img?: string;
  imgWebp?: string;
};

const PageDecorTypes = {
  small: {
    img: '/img/content/maniac/maniac-size-m',
    height: '768'
  },
  big: {
    img: '/img/content/maniac/maniac-bg-size-m',
    height: '1959'
  },
};

export default function PageDecor ({size, img, imgWebp}: PageDecorProps): JSX.Element {
  return (
    <div className="decorated-page__decor" aria-hidden="true">
          <picture>
            <source
              type="image/webp"
              srcSet={imgWebp ? imgWebp : `${PageDecorTypes[size].img}.webp, ${PageDecorTypes[size].img}@2x.webp 2x`}
            />
            <img
              src={img ? img.slice(0, img.indexOf(' ') + 1) : `${PageDecorTypes[size].img}.jpg`}
              srcSet={img ? img : `${PageDecorTypes[size].img}@2x.jpg 2x`}
              width="1366"
              height={PageDecorTypes[size].height}
              alt=""
            />
          </picture>
        </div>
  );
}
