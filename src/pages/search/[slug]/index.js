import Search from "../../../components/search";

export default function SearchLayout({ slug }) {
    return (
        <Search slug={slug} />
    );
}

export async function getServerSideProps(context) {
    const { slug } = context.params;
    return {
        props: { slug: decodeURIComponent(slug) },
    };
}