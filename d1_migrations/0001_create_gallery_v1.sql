-- CreateTable
CREATE TABLE "GalleryV1" (
    "uuid" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "GalleryV1Blob" (
    "uuid" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    CONSTRAINT "GalleryV1Blob_uuid_fkey" FOREIGN KEY ("uuid") REFERENCES "GalleryV1" ("uuid") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "GalleryV1_uuid_key" ON "GalleryV1"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "GalleryV1Blob_uuid_filename_key" ON "GalleryV1Blob"("uuid", "filename");
