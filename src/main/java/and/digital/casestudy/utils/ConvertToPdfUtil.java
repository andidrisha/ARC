package and.digital.casestudy.utils;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.List;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;

import and.digital.casestudy.models.CaseStudy;

public class ConvertToPdfUtil {

	public static void convertToPdf(List<CaseStudy> caseStudies) {

		Document pdfRecord = new Document();
		PdfPTable report;
		try {
			String home = System.getProperty("user.home");
			PdfWriter.getInstance(pdfRecord, new FileOutputStream(home + "//Downloads//myPdf.pdf"));
			pdfRecord.open();
			report = new PdfPTable(5);
			report.setWidthPercentage(100); 
			report.setSpacingBefore(10f); 
			report.setSpacingAfter(10f);
			PdfPCell cell;

			for (CaseStudy cs : caseStudies) {
				cell = new PdfPCell(new Paragraph(cs.getName()));
				report.addCell(cell);
				cell = new PdfPCell(new Phrase(cs.getClientName()));
				report.addCell(cell);
				cell = new PdfPCell(new Phrase(cs.getDescription()));
				report.addCell(cell);
				cell = new PdfPCell(new Phrase(cs.getSummary()));
				report.addCell(cell);
				cell = new PdfPCell(new Phrase(cs.getTags()));
				report.addCell(cell);
				pdfRecord.add(report);
			}
		} catch (FileNotFoundException | DocumentException e) {
			e.printStackTrace();
		} finally {
			pdfRecord.close();
		}
	}
	
	public static void main(String[] args) {
		
		List<CaseStudy> caseStudies = new ArrayList<CaseStudy>();
		CaseStudy cs1= new CaseStudy();
		cs1.setClientName("clientName1");
		cs1.setName("name1");
		cs1.setDescription("description1");
		cs1.setSummary("summary1");
		cs1.setTags("tags1");
		
		CaseStudy cs2= new CaseStudy();
		cs2.setClientName("clientName1");
		cs2.setName("name2");
		cs2.setDescription("description1");
		cs2.setSummary("summary1");
		cs2.setTags("tags1");
		
		CaseStudy cs3= new CaseStudy();
		cs3.setClientName("clientName3");
		cs3.setName("name3");
		cs3.setDescription("description3");
		cs3.setSummary("summary3");
		cs3.setTags("tags3");
		
		caseStudies.add(cs1);
		caseStudies.add(cs2);
		caseStudies.add(cs3);
		convertToPdf(caseStudies);
		
	}
}
