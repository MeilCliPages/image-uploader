import { Root } from "./component";

export const Content = () => (
    <Root title="Image Uploader" externalJavaScripts={[]}>
        <div class="container">
            <h2 class="text-center mt-5">Image Uploader</h2>
            <div class="row">
                <div class="card col-md-3">
                    <div class="card-body">
                        <h5 class="card-title">Gallery uploader</h5>
                        <p class="card-text">Uploader of gallery image. And auto generate compressed images.</p>
                        <a href="gallery/v1" class="card-link">
                            Go to uploader
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </Root>
);
