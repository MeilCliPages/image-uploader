// @ts-expect-error import html as string
import scriptHtml from "./script.html";
import { raw } from "hono/html";
import { Root, Navigator, ExternalJavaScript } from "./../../../component";

export const Content = () => (
    <Root title="Gallery" externalJavaScripts={[ExternalJavaScript.BsCustomFileInput, ExternalJavaScript.Compressor]}>
        <Navigator
            navigations={[
                { link: "/", text: "Home" },
                { link: "/gallery/v1", text: "Gallery" },
                { link: "", text: "Upload" },
            ]}
        />
        <div class="container">
            <div class="row">
                <div class="col-md-6 offset-md-3">
                    <div class="card my-5">
                        <div class="card-body">
                            <h6 class="text-center mt-1 mb-3">Choose upload image</h6>
                            <form id="upload_form">
                                <div class="form-row">
                                    <div class="col-md-10 custom-file">
                                        <input
                                            type="file"
                                            id="originalFile"
                                            name="originalFile"
                                            class="custom-file-input"
                                            onchange="onChangeOriginalFile();"
                                        />
                                        <label class="custom-file-label" for="originalFile">
                                            Choose file...
                                        </label>
                                    </div>
                                    <div class="col-md-2">
                                        <button type="submit" id="uploadButton" class="btn btn-primary">
                                            Upload
                                        </button>
                                    </div>
                                </div>
                            </form>

                            <a class="card-link invisible" id="detailButton">
                                Details
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {raw(scriptHtml)}
    </Root>
);
