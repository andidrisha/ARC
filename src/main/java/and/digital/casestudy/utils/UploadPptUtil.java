package and.digital.casestudy.utils;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.List;

import org.apache.poi.xslf.usermodel.DrawingParagraph;
import org.apache.poi.xslf.usermodel.XMLSlideShow;
import org.apache.poi.xslf.usermodel.XSLFSlide;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class UploadPptUtil {

	static Logger logger = LoggerFactory.getLogger(ConvertToPdfUtil.class);

	public static void readPPTXFile(String path) {
		logger.info("Reading the ppt file");
		XMLSlideShow ppt = null;
		try {
			ppt = new XMLSlideShow(new FileInputStream(path));
			List<XSLFSlide> slides = ppt.getSlides();

			for (int i = 0; i < slides.size(); i++) {
				XSLFSlide slide = slides.get(i);
				String title = slide.getTitle();
				List<DrawingParagraph> data = slide.getCommonSlideData().getText();
				System.out.println(title);

				for (int j = 0; j < data.size(); j++) {
					DrawingParagraph para = data.get(j);
					System.out.println(para.getText());
				}
			}
		} catch (Exception e) {
			logger.error("Error while reading the pptx file.");
			e.printStackTrace();
		} finally {
			try {
				ppt.close();
			} catch (IOException e) {
				logger.error("Error while closing the pptx file.");
			}
		}
	}

	public static void main(String[] args) {
		String home = System.getProperty("user.home");
		readPPTXFile(home + "//Downloads//Test.pptx");
	}

}
