export interface PaginationProps {
    minPage: number;
    maxPage: number;
    currentPage: number;
    createPageUrl: (page: number) => string;
}

export const Pagination = (props: PaginationProps) => {
    const isPreviousActive = props.minPage < props.currentPage;
    const isNextActive = props.currentPage < props.maxPage;
    return (
        <nav>
            <ul class="pagination justify-content-center">
                <PageItem
                    text="Previous"
                    href={props.createPageUrl(props.currentPage - 1)}
                    state={isPreviousActive ? "normal" : "disable"}
                />
                {props.minPage < props.currentPage - 1 && (
                    <PageItem
                        text={props.minPage.toString()}
                        href={props.createPageUrl(props.minPage)}
                        state="normal"
                    />
                )}
                {props.minPage < props.currentPage - 2 && <PageItem text="..." href="" state="disable" />}
                {props.minPage < props.currentPage && (
                    <PageItem
                        text={(props.currentPage - 1).toString()}
                        href={props.createPageUrl(props.currentPage - 1)}
                        state="normal"
                    />
                )}
                <PageItem
                    text={props.currentPage.toString()}
                    href={props.createPageUrl(props.currentPage)}
                    state="active"
                />
                {props.currentPage < props.maxPage && (
                    <PageItem
                        text={(props.currentPage + 1).toString()}
                        href={props.createPageUrl(props.currentPage + 1)}
                        state="normal"
                    />
                )}
                {props.currentPage + 2 < props.maxPage && <PageItem text="..." href="" state="disable" />}
                {props.currentPage + 1 < props.maxPage && (
                    <PageItem
                        text={props.maxPage.toString()}
                        href={props.createPageUrl(props.maxPage)}
                        state="normal"
                    />
                )}
                <PageItem
                    text="Next"
                    href={props.createPageUrl(props.currentPage + 1)}
                    state={isNextActive ? "normal" : "disable"}
                />
            </ul>
        </nav>
    );
};

type PageItemState = "disable" | "normal" | "active";

const PageItem = (props: { text: string; href: string; state: PageItemState }) => {
    if (props.state == "disable") {
        return (
            <li class="page-item disabled">
                <a class="page-link" tabindex={-1}>
                    {props.text}
                </a>
            </li>
        );
    }
    if (props.state == "active") {
        return (
            <li class="page-item active">
                <span class="page-link">
                    {props.text} <span class="sr-only"></span>
                </span>
            </li>
        );
    }
    return (
        <li class="page-item">
            <a class="page-link" href={props.href}>
                {props.text}
            </a>
        </li>
    );
};
