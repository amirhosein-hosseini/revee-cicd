import GenderPage from "@/components/category/gender";

export default function genderLayout({ slug }) {
    return (
        <GenderPage slug={slug} />
    );
}

export async function getServerSideProps(context) {
    const { slug } = context.params;
    return {
        props: { slug: decodeURIComponent(slug) },
    };
}