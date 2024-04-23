export enum ExternalJavaScript {
    BsCustomFileInput = "https://cdnjs.cloudflare.com/ajax/libs/bs-custom-file-input/1.3.4/bs-custom-file-input.min.js",
    Compressor = "https://cdnjs.cloudflare.com/ajax/libs/compressorjs/1.2.1/compressor.min.js",
    Clipboard = "https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.11/clipboard.min.js",
}

export interface RootProps {
    title: string;
    externalJavaScripts: ExternalJavaScript[];
    children?: unknown;
}

export const Root = (props: RootProps) => (
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width,initial-scale=1" />
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/4.6.2/css/bootstrap.min.css"
            />
            {props.externalJavaScripts.map((x) => (
                <script type="text/javascript" src={x}></script>
            ))}
            <title>{props.title}</title>
        </head>
        <body class="bg-light">{props.children}</body>
    </html>
);
