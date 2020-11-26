import Head from "next/head";

export default function Title({ title }) {
  return (
    <Head>
      <title>{`${title} - FX Cart`}</title>
    </Head>
  )
}
