export interface NavigatorProps {
    navigations: { link: string; text: string }[];
}

export const Navigator = (props: NavigatorProps) => (
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            {props.navigations.map((x, index) => (
                <Navigation link={x.link} text={x.text} active={index == props.navigations.length - 1} />
            ))}
        </ol>
    </nav>
);

const Navigation = (props: { link: string; text: string; active: boolean }) => {
    if (props.active) {
        return (
            <li class="breadcrumb-item active" aria-current="page">
                {props.text}
            </li>
        );
    }
    return (
        <li class="breadcrumb-item">
            <a href={props.link}>{props.text}</a>
        </li>
    );
};
