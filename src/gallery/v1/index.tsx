import { GalleryV1 } from "./entity";
import { Root, Navigator, Pagination } from "../../component";

interface ContentProps {
    maxPage: number;
    currentPage: number;
    count: number;
    galleryV1List: GalleryV1[];
    localDateStringConverter: (dateString: string) => string;
}

export const Content = (props: ContentProps) => (
    <Root title="Gallery" externalJavaScripts={[]}>
        <Navigator
            navigations={[
                { link: "/", text: "Home" },
                { link: "", text: "Gallery" },
            ]}
        />
        <div class="container">
            {props.currentPage == 1 && <Jumbotron />}
            <div class="row">
                {props.galleryV1List.map((x) => (
                    <Card galleryV1={x} localDateStringConverter={props.localDateStringConverter} />
                ))}
            </div>
            <div class="footer-space mb-2"></div>
            <Pagination
                minPage={1}
                maxPage={props.maxPage}
                currentPage={props.currentPage}
                createPageUrl={(page) => `?page=${page}&count=${props.count}`}
            />
        </div>
    </Root>
);

const Jumbotron = () => (
    <div class="jumbotron">
        <h1 class="display-4">Galley</h1>
        <p class="lead">Gallery is main image of site content.</p>
        <a class="btn btn-primary btn-lg" href="./v1/upload" role="button">
            Upload Image
        </a>
    </div>
);

function getThumbnailUrl(galleryV1: GalleryV1): string {
    return galleryV1.blobs.find((x) => x.url.endsWith("image-540.webp"))?.url ?? galleryV1.blobs[0].url;
}

const Card = (props: { galleryV1: GalleryV1; localDateStringConverter: (dateString: string) => string }) => (
    <div class="col-md-3 mt-3">
        <div class="card">
            <img src={getThumbnailUrl(props.galleryV1)} class="card-img-top" height="120px" style="object-fit: cover" />
            <div class="card-body">
                <p class="card-text">
                    <small class="text-muted">{props.localDateStringConverter(props.galleryV1.createdAt)}</small>
                </p>
                <a href={`./v1/detail/${props.galleryV1.uuid}`} class="card-link">
                    Details
                </a>
            </div>
        </div>
    </div>
);
