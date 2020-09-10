export type HomeScreenProps = {
	navigateParent: (parentName: string, screen: string) => void;
};

export type statistics = {
    totalUploads: number;
    awaitingUploads: number;
    completedUploads: number;
}