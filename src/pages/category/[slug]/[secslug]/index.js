import SubCategory from "../../../../components/category/subCategory";

export default function subCategoryLayout({ secslug }) {
    return (
        <SubCategory secslug={secslug} />
    );
}

export async function getServerSideProps(context) {
    const { secslug } = context.params;
    return {
        props: { secslug: decodeURIComponent(secslug) },
    };
}