// @ts-expect-error import html as string
import scriptHtml from "./script.html";
import { html, raw } from "hono/html";
import { GalleryV1 } from "./../entity";
import { Root, Navigator, ExternalJavaScript } from "./../../../component";

interface ContentProps {
    galleryV1: GalleryV1;
    localDateStringConverter: (dateString: string) => string;
}

export const Content = (props: ContentProps) => (
    <Root title="Gallery" externalJavaScripts={[ExternalJavaScript.Clipboard]}>
        <Navigator
            navigations={[
                { link: "/", text: "Home" },
                { link: "/gallery/v1", text: "Gallery" },
                { link: "", text: "Detail" },
            ]}
        />
        <div class="container-fluid">
            <div class="row ml-3 mr-3">
                <div class="col-md-6">
                    <img src={getImageUrl(props.galleryV1)} class="img-fluid" />
                </div>
                <form class="col-md-6">
                    {props.galleryV1.blobs.map((x) => (
                        <BlobUrlRow url={x.url} />
                    ))}
                    <DeleteRow />
                </form>
            </div>
            {ClipboardJsInitializer}
            {raw(scriptHtml)}
        </div>
    </Root>
);

function getImageUrl(galleryV1: GalleryV1): string {
    return galleryV1.blobs.find((x) => x.url.includes("original"))?.url ?? galleryV1.blobs[0].url;
}

const BlobUrlRow = (props: { url: string }) => (
    <div class="form-row mt-3">
        <div class="col-md-10">
            <input type="text" class="form-control" value={props.url} />
        </div>
        <div class="col-md-1">
            <button type="button" class="btn btn-primary" data-clipboard-text={props.url}>
                Copy
            </button>
        </div>
        <div class="col-md-1">
            <a class="btn btn-outline-primary" href={props.url} role="button">
                Show
            </a>
        </div>
    </div>
);

const DeleteRow = () => (
    <div class="form-row mt-3">
        <button type="button" class="btn btn-danger" onclick="onDeleteButtonClicked()">
            Delete
        </button>
    </div>
);

const ClipboardJsInitializer = html`<script>
    const clipboard = new ClipboardJS(".btn");
    clipboard.on("success", (e) => {
        e.trigger.innerHTML = "Copied";
    });
</script>`;
