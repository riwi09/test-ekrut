import Head from 'next/head';

interface IProps {
  title?: string;
  description?: string;
  keyword?: string;
}

const DEFAULT_TITLE = 'TEST EKRUT';
const DEFAULT_DESCRIPTION = 'Halaman test ekrut';
const DEFAULT_KEYWORD = 'Halaman test ekrut';

const MetaTag = ({ description, title, keyword }: IProps) => (
  <Head>
    <title>{title || DEFAULT_TITLE}</title>
    <meta charSet="UTF-8" />
    <meta name="description" content={description || DEFAULT_DESCRIPTION} />
    <meta name="keywords" content={keyword || DEFAULT_KEYWORD} />
    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
  </Head>
);

export default MetaTag;
