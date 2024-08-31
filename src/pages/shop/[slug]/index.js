import SingleShop from "../../../components/shop/single";

export default function productLayout({ slug }) {
    return (
        <SingleShop slug={slug} />
    );
}

export async function getServerSideProps(context) {
    const { slug } = context.params;
    return {
        props: { slug: decodeURIComponent(slug) },
    };
}